namespace Model.Entities
{

    public abstract class UserBase
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Enabled { get; set; }
        public bool Deleted { get; set; }
        public UserType UserType { get; set; }
    }
}
