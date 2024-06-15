using Backend.Infrastructure.Contexts;
using Backend.Domain;
using Backend.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public class ExternalUserMappingRepository : IExternalUserMappingRepository
    {
        private readonly DataContext _context;

        public ExternalUserMappingRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ExternalUserMapping> GetByExternalId(string externalId)
        {
            return await _context.ExternalUserMappings
                .Where(m => m.ExternalId == externalId)
                .FirstOrDefaultAsync();
        }

        public async Task AddMapping(string externalId, int internalId)
        {
            _context.ExternalUserMappings.Add(new ExternalUserMapping
            {
                ExternalId = externalId,
                InternalId = internalId
            });

            await _context.SaveChangesAsync();
        }
    }

}

