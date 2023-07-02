using System;
using Backend.Models;

namespace Backend.Dto
{
	public class BookmarkDto
	{
        public string Title { get; set; }

        public string ImageURL { get; set; }

        public string Description { get; set; }

        public int Review { get; set; }

        public Status Status { get; set; }
    }
}

