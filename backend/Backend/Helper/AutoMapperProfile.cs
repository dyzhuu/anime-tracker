using System;
using Backend.Models;
using Backend.Dto;
using AutoMapper;

namespace Backend.Helper
{
	public class AutoMapperProfile : Profile
	{
		public AutoMapperProfile()
		{
			CreateMap<Anime, AnimeDto>();
            CreateMap<AnimeDto, Anime>();
            CreateMap<Bookmark, BookmarkDto>()
				.ForMember(d => d.Title, b => b.MapFrom(s => s.Anime.Title))
				.ForMember(d => d.ImageURL, b => b.MapFrom(s => s.Anime.ImageURL))
				.ForMember(d => d.Description, b => b.MapFrom(s => s.Anime.Description));

			CreateMap<UserDto, User>();
            CreateMap<BookmarkDto, Anime>();
        }
    }
}

