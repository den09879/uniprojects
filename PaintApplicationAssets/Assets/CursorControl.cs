using UnityEngine;
using System.Collections;
using System.Collections.Generic;
public class CursorControl : MonoBehaviour
{

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        GetComponent<Transform>().localScale = new Vector2(paintGM.currentScale, paintGM.currentScale);
        if (Input.GetKey("up"))
        {
            transform.position += new Vector3(0, 0.01f, 0);
        }
        if (Input.GetKey("down"))
        {
            transform.position -= new Vector3(0, 0.01f, 0);
        }
        if (Input.GetKey("left"))
        {
            transform.position -= new Vector3(0.01f, 0, 0);
        }
        if (Input.GetKey("right"))
        {
            transform.position += new Vector3(0.01f, 0, 0);
        }

    }

}
