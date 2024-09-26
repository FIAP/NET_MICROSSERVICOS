public class Usuario
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public UserType UserType { get; set; }
}


public enum UserType
{
    Admin = 1,
    Teacher = 2,
    Applicant = 3,
    Company = 4
}

