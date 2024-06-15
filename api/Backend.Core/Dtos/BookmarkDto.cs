﻿using System;
using Backend.Domain;

namespace Backend.Core.Dtos
{
    public class BookmarkDto
	{
        public int UserId { get; set; }

        public int AnimeId { get; set; }

        public string Title { get; set; }

        public string ImageURL { get; set; }

        public string Description { get; set; }

        public int Rating { get; set; }

        public Status Status { get; set; }
    }
}

