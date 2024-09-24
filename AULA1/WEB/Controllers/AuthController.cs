using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Security;
using Service.Interfaces;
using Service.Models;

namespace WEB.Controllers
{
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<ActionResult> LogOn(UserViewModel login)
        {
            var logOn = await _authService.LoginAsync(login);

            if (logOn != null) {
                FormsAuthentication.SetAuthCookie(logOn.Username + "|" + logOn.Email + "|" + logOn.UserType.ToString(), true);

                switch (logOn.UserType) {
                    case UserType.Admin:
                        return RedirectToAction("Index", "Admin");
                    case UserType.Teacher:
                        return RedirectToAction("Index", "Teacher");
                    case UserType.Applicant:
                        return RedirectToAction("Index", "Applicant");
                    case UserType.Company:
                        return RedirectToAction("Index", "Company");
                }

            }

            return View("Index");
        }

        [HttpGet]
        public ActionResult LogOn()
        {

            return View("Index");
        }

        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();
            return View("Index");
        }


    }
}