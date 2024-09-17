using UnityEngine;
using System.Collections;
using System.Collections.Generic;
public class paintGM : MonoBehaviour
{
    public Transform baseDot;
    public KeyCode mouseLeft;
    public Sprite startingSprite;
    public Transform cursor;
    public static string toolType;
    public static Color currentColor;
    public static int currentOrder;
    public static float currentScale = 1f;
    public static Sprite currentSprite;
    public static List<GameObject> allDots;
    public static float zAngle = 0f;
    public static bool pause = false;
    void Start()
    {
        toolType = "View";
        currentColor = Color.black;
        currentSprite = startingSprite;
    }
    private void Update()
    {
        Vector2 mousePosition = new Vector2(Input.mousePosition.x, Input.mousePosition.y);
        Vector2 objPosition = Camera.main.ScreenToWorldPoint(mousePosition);
        Vector2 cursorPosition = new Vector2(cursor.position.x, cursor.position.y);

        if (toolType == "Pencil" && pause == false)
        {
            Instantiate(baseDot, cursorPosition, baseDot.rotation);
        }

    }
}
