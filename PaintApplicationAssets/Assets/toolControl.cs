using UnityEngine;

public class toolControl : MonoBehaviour
{
    public Transform cursor;
    private void OnMouseDown()
    {
        if (gameObject.name == "View")
        {
            paintGM.toolType = "View";
        }
        if (gameObject.name == "Eraser")
        {
            paintGM.toolType = "Eraser";
        }
        if (gameObject.name == "Pencil")
        {
            paintGM.toolType = "Pencil";
        }
        if (gameObject.name == "SizeUp")
        {
            paintGM.currentScale += .5f;
        }
        if (gameObject.name == "SizeDown")
        {
            paintGM.currentScale -= .5f;
        }
        if (gameObject.name == "TriangleShape" || gameObject.name == "CircleShape" || gameObject.name == "SquareShape")
        {
            paintGM.currentSprite = gameObject.GetComponent<SpriteRenderer>().sprite;
        }
        if (gameObject.name == "NewCanvas")
        {
            newCanvas();
        }
        if (gameObject.name == "RotateLeft")
        {
            paintGM.zAngle += 15f;
        }
        if (gameObject.name == "RotateRight")
        {
            paintGM.zAngle -= 15f;
        }

    }
    private void newCanvas()
    {
        GameObject[] allDots = GameObject.FindGameObjectsWithTag("dot");
        for (int i = allDots.Length - 1; i >= 0; i--)
        {
            Destroy(allDots[i]);
        }
        setOrigin();
    }

    private void setOrigin()
    {
        cursor.transform.position = new Vector3(0, 0, 0);
    }
    private void OnCollisionEnter2D(Collision2D collision)
    {

        if (gameObject.name == "NewCanvas")
        {
            newCanvas();
        }
        if (gameObject.name == "View")
        {
            paintGM.toolType = "View";
        }
        if (gameObject.name == "Eraser")
        {
            paintGM.toolType = "Eraser";
        }
        if (gameObject.name == "Pencil")
        {
            paintGM.toolType = "Pencil";
            setOrigin();
        }
        if (gameObject.name == "SizeUp")
        {
            paintGM.currentScale += .5f;
        }
        if (gameObject.name == "SizeDown")
        {
            paintGM.currentScale -= .5f;
        }
        if (gameObject.name == "TriangleShape" || gameObject.name == "CircleShape" || gameObject.name == "SquareShape")
        {
            paintGM.currentSprite = gameObject.GetComponent<SpriteRenderer>().sprite;
        }
        if (gameObject.name == "RotateLeft")
        {
            paintGM.zAngle += 15f;
        }
        if (gameObject.name == "RotateRight")
        {
            paintGM.zAngle -= 15f;
        }
    }
}