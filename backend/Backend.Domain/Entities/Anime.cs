namespace Backend.Domain
{
    public class Anime : BaseEntity
    {
        public string Title { get; set; }

        public string ImageURL { get; set; }

        public string Description { get; set; }

        public ICollection<Bookmark> Bookmarks { get; set; }

    }
}
