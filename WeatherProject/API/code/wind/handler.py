"""
A user friendly way of accessing the wind efficiency command
Written by Alex O'Neill (z5359415)
"""
import sys
sys.path.insert(0, 'package/')

import json
import requests
import logging
import newrelic.agent
from flagbase import FlagbaseClient, Config, Identity

logger = logging.getLogger()
logger.setLevel(logging.INFO)
newrelic.agent.initialize()
@newrelic.agent.lambda_handler()
def handler(event, context):
    """ Allows users to access the wind efficiency API without knowledge of GraphQL """
    print("Wind Handler Called")
    try:
        # Loads data from JSON input
        data = json.loads((event)['body'])

        # Sends properly formatted GraphQL to our weather API
        link = "https://afzpve4n13.execute-api.ap-southeast-2.amazonaws.com/F12A_PAPA/weather"
        graphql = """\"mutation CreateWind {\\n    createWind(location: \\"Cape Byron\\") {\\n        wind_efficiency\\n        success\\n        errors\\n    }\\n}\"""".replace("Cape Byron", data["location"])
        query = """{ "query" : """+graphql+"""}"""
        req = requests.post(link, json=json.loads(query)).text
        # Extracts the wind results from our weather API
        result = eval(req)["data"]["createWind"]
        # Returns result of the request
        logger.info("Successful Wind efficiency")
        flagbase = FlagbaseClient(
        config=Config(
            server_key="sdk-server_491e7607-dac2-41dc-abed-1ba904cdb032",
            )
        )

        # user details might be pulled from your database
        user = Identity(
            "some-user-id",
            {"some-trait-key": "blue"}
        )
        show_feature = flagbase.variation("example-flag", user, "control") == "treatment"
        print (show_feature)
        if show_feature == "treatment":
            newrelic.agent.record_custom_event('CreateWindSuccess', {'WindResult': result})
            print("So the flag isnt working :()")
            return {
                "statusCode": 200,
                "body": str(result),
                "headers": {
                    "Content-Type": "application/json",
                },
            }
        else:
            newrelic.agent.record_custom_event('CreateWindDisabled', {'WindResult': result})
            print("Nah it is lol")
            return {
                "statusCode": 400,
                "body": 'Feature is not available',
                "headers": {
                    "Content-Type": "application/json",
                },
            }
    except Exception as e:
        newrelic.agent.record_custom_event('CreateWindError', {'Error': "Server error"})
        return {
            "statusCode": 500,
            "body": '{"status":"Server error"}',
            "headers": {
                "Content-Type": "application/json",
            },
        }