using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System.Collections;

public class ButtonHandler : MonoBehaviour
{

    [SerializeField] Button redButton;
    public Transform border;
    void Start () {
		redButton.onClick.AddListener(TaskOnClick);
	}

    void TaskOnClick(){
        border = redButton.transform.Find("Border");
        Debug.Log ("You have clicked the button!");
        if (border != null) {
            Debug.Log ("Border has been found");
            border.gameObject.SetActive(true);
        }
		
	}
}
