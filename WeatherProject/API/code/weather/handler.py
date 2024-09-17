"""
The service that allows for GraphQL to work on the internet
Written by Alex O'Neill (z5359415)
"""
import sys
sys.path.insert(0, 'package/')

import json
from ariadne import load_schema_from_path, make_executable_schema, \
    graphql_sync, snake_case_fallback_resolvers, ObjectType
from queries import list_locations_resolver
from mutations import create_weather_resolver, create_wind_resolver

import logging
import newrelic.agent

logger = logging.getLogger()
logger.setLevel(logging.INFO)
newrelic.agent.initialize()
@newrelic.agent.lambda_handler()
def handler(event, context):
    """ Allows the GraphQL to work as a web service """

    try:
        # Sets query object
        query = ObjectType("Query")
        query.set_field("listLocations", list_locations_resolver)

        # Sets mutation object
        mutation = ObjectType("Mutation")
        mutation.set_field("createWeather", create_weather_resolver)
        mutation.set_field("createWind", create_wind_resolver)

        # Loads in JSON data
        data = json.loads((event)['body'])

        # Loads in schema from local file
        type_defs = load_schema_from_path("schema.graphql")
        # Makes an executable schema
        schema = make_executable_schema(
            type_defs, query, mutation, snake_case_fallback_resolvers
        )
        #newrelic.agent.record_custom_event('Payload Success', {
        #    'message': "hello",
        #})
        logger.info("Successful Weather efficiency")
        print(context)
        # Sends information as a GraphQl request
        success, result = graphql_sync(
            schema,
            data
        )
        print (result)
        # Returns status code based on success
        status_code = 500
        if success:
            status_code = 200
            newrelic.agent.record_custom_event('CreateWeatherSuccess', {'WeatherResult': result})
        return {
            "statusCode": status_code,
            "body": str(result),
            "headers": {
                "Content-Type": "application/json",
            },
        }
    except Exception as e:
        print(e)
        newrelic.agent.record_custom_event('CreateWeatherError', {'WeatherError': e})
        return {
            "statusCode": 500,
            "body": '{"status":"Server error"}',
            "headers": {
                "Content-Type": "application/json",
            },
        }
