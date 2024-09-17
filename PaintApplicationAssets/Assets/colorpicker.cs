using UnityEngine;

public class colorpicker : MonoBehaviour
{
    private void colourChange()
    {
        paintGM.currentColor = GetComponent<SpriteRenderer>().color;
        paintGM.currentOrder += 1;
    }
    private void OnMouseDown()
    {
        colourChange();
    }
    private void OnCollisionEnter2D(Collision2D collision)
    {
        colourChange();
    }
}