using Backend.Domain;
using Backend.Core.Dtos;
using AutoMapper;

namespace Backend.Core.Helper
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
			CreateMap<BookmarkDto, Bookmark>();

			//id provided in userService
			CreateMap<BookmarkDto, Anime>()
				.ForMember(d => d.Id, b => b.MapFrom(s => s.AnimeId));

			CreateMap<UserDto, User>()
				.ForMember(d => d.PasswordHash, b => b.MapFrom(s => s.Password));
			CreateMap<User, UserDto>()
                 .ForMember(d => d.Password, b => b.MapFrom(s => s.PasswordHash));

            CreateMap<UserReqDto, User>()
                .ForMember(d => d.PasswordHash, b => b.MapFrom(s => s.Password));
            //	.ForMember(d => d.BookmarkDtos, b => b.MapFrom(s => _mapper.Map<List<BookmarkDto>>(s.Bookmarks)));
        }
    }
}

