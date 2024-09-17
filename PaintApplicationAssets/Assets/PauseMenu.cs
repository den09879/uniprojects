using UnityEngine;
using UnityEngine.SceneManagement;

public class PauseMenu : MonoBehaviour
{
    [SerializeField] GameObject pauseMenu;
    public void Pause()
    {
        pauseMenu.SetActive(true);
        paintGM.pause = true;
    }
    public void Resume()
    {
        pauseMenu.SetActive(false);
        paintGM.pause = false;

    }
    public void Restart()
    {
        paintGM.pause = false;
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }

    public void Exit()
    {
        Application.Quit();
    }
}
