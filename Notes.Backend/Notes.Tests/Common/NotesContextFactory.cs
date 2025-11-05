using Microsoft.EntityFrameworkCore;
using Notes.Domain;
using Notes.Persistance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Notes.Tests.Common
{
	public class NotesContextFactory
	{
		public static Guid UserAId = Guid.NewGuid();
		public static Guid UserBId = Guid.NewGuid();

		public static Guid NoteIdForDelete = Guid.NewGuid();
		public static Guid NoteIdForUpdate = Guid.NewGuid();

		public static NotesDbContext Create()
		{
			var options = new DbContextOptionsBuilder<NotesDbContext>()
				.UseInMemoryDatabase(Guid.NewGuid().ToString())
				.Options;

			var context = new NotesDbContext(options);
			context.Database.EnsureCreated();
			context.Notes.AddRange(
				new Note
				{
					CreationDate = DateTime.Today,
					Details = "Details1",
					EditDate = null,
					Id = Guid.Parse("8A321D31-209D-45F1-8000-FEEF32852122"),
					Title = "Title1",
					UserId = UserAId
				},
				new Note
				{
					CreationDate = DateTime.Today,
					Details = "Details2",
					EditDate = null,
					Id = Guid.Parse("272238AE-6D8B-491A-913C-476083AA062A"),
					Title = "Title2",
					UserId = UserBId
				},
				new Note
				{
					CreationDate = DateTime.Today,
					Details = "Details3",
					EditDate = null,
					Id = NoteIdForDelete,
					Title = "Title3",
					UserId = UserAId
				},
				new Note
				{
					CreationDate = DateTime.Today,
					Details = "Details4",
					EditDate = null,
					Id = NoteIdForUpdate,
					Title = "Title4",
					UserId = UserBId
				}
			);
			context.SaveChanges();
			return context;
		}

		public static void Destroy(NotesDbContext context)
		{
			context.Database.EnsureDeleted();
			context.Dispose();
		}
	}
}
