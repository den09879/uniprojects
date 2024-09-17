using UnityEngine;
using System.Collections;
using System.Collections.Generic;
public class dotControl : MonoBehaviour
{
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        GetComponent<SpriteRenderer>().color = paintGM.currentColor;
        GetComponent<Transform>().localScale = new Vector2(paintGM.currentScale, paintGM.currentScale);
        GetComponent<SpriteRenderer>().sprite = paintGM.currentSprite;
        gameObject.transform.Rotate(0.0f, 0.0f, paintGM.zAngle);
    }

    private void Update()
    {
    }
    private void OnMouseOver()
    {
        if (paintGM.toolType == "Eraser")
        {
            Destroy(gameObject);
        }
    }

    
    private void OnCollisionEnter2D(Collision2D collision)
    {

        if (paintGM.toolType == "Eraser")
        {
            Destroy(gameObject);
        }
    }
}
