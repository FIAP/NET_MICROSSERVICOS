namespace Service.Models
{
    public enum UserType
    {
        Admin = 1,
        Teacher = 2,
        Applicant = 3,
        Company = 4
    }

    public class UserViewModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }  
        public UserType UserType { get; set; }

    }
}