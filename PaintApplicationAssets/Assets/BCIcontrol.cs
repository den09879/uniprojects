using UnityEngine;
using EmotivUnityPlugin;
using System.Collections.Generic;
using System;

// Following code from https://www.youtube.com/watch?v=LJtuVVaSVeM&t=236s
public class MentalCommands : MonoBehaviour
{
    static BCITraining _bciTraining = new BCITraining();
    static EmotivUnityItf _eItf = new EmotivUnityItf();

    bool IsMentalCmdRcvd = false;
    bool IsDataBufferUsing = true;

    bool session = false;
    public Transform cursor;
    private string clientID = "gsGztEA1JGXJD47aFDJqrU53eayDb3pBe6akQ5a1";
    private string clientSecret = "HAqhOXCpFMeZWACgtCcoQcAAN5d3tPKjJxkG5LYHD3YseVxLY769zXRRorIlZKhJFC9BYFjMUTyJmvNDcgTcPtHeR0FyqDqodiPqe0iQceIlaMjghnGFCUarhp2KfIm3";
    // Subscribe to different data stream from device
    static List<string> dataStreamList = new List<string> {
        DataStreamName.DevInfos,
        DataStreamName.MentalCommands,
        DataStreamName.SysEvents,
        DataStreamName.PerformanceMetrics
    };

    private void OnGUI()
    {
        if (Event.current.Equals(Event.KeyboardEvent("Q")))
        {
            CreateSession();
        }
        if (Event.current.Equals(Event.KeyboardEvent("E")))
        {
            Subscribe();
        }
        if (Event.current.Equals(Event.KeyboardEvent("R")))
        {
            LoadProfile();
        }
        if (Event.current.Equals(Event.KeyboardEvent("T")))
        {
            Unsubscribe();
        }
        if (Event.current.Equals(Event.KeyboardEvent("Y")))
        {
            UnLoadProfile();
        }
        if (Event.current.Equals(Event.KeyboardEvent("U")))
        {
            Stop();
        }
        if (Event.current.Equals(Event.KeyboardEvent("I")))
        {
            Start();
        }
    }

    // On play, run Start()
    void Start()
    {
        Debug.Log("Starting...");
        // Authorization with your account
        _eItf.Init(clientID, clientSecret, "3.8.0", "UnityApp", true);
        _eItf.Start();
    }

    void Stop()
    {
        _eItf.Stop();
    }

    // Must create session first to connect with device
    public void CreateSession()
    {
        Debug.Log("Connecting to BCI device...");
        if (!_eItf.IsAuthorizedOK)
        {
            Debug.LogError("Authorisation in progress. Please wait...");
        }
        if (_eItf.IsSessionCreated)
        {
            Debug.Log("Existing Session already created.");
        }
        _eItf.CreateSessionWithHeadset("INSIGHT2-DE4AF3FE");
    }

    public void Subscribe()
    {
        _eItf.SubscribeData(dataStreamList);
        IsMentalCmdRcvd = true;
    }

    public void Unsubscribe()
    {
        _eItf.UnSubscribeData(dataStreamList);
        IsMentalCmdRcvd = false;
    }

    public void LoadProfile()
    {
        _eItf.LoadProfile("paint");

    }

    public void UnLoadProfile()
    {
        _eItf.UnLoadProfile("paint");
    }

    private void Update()
    {
        if (IsMentalCmdRcvd)
        {
            // Mental command
            // TODO: Right now command is NULL. Even if there is a previously created session...
            // Not sure how to create a new session to subscibe to mental commands
            string command = _eItf.LatestMentalCommand.act;
            double power = _eItf._dsManager.getMentalCommandPower();
            if (command == "push")
            {
                cursor.transform.position += new Vector3(0, 0.001f * (float)power, 0);
            }
            else if (command == "pull")
            {
                cursor.transform.position -= new Vector3(0, 0.001f * (float)power, 0);
            }
            else if (command == "right")
            {
                cursor.transform.position += new Vector3(0.001f * (float)power, 0, 0);
            }
            else if (command == "left")
            {
                cursor.transform.position -= new Vector3(0.001f * (float)power, 0, 0);
            }
        }

    }

}