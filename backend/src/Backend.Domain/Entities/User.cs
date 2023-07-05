namespace Backend.Domain
{
    public class User : BaseEntity
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public ICollection<Bookmark> Bookmarks { get; set; }
    }
}