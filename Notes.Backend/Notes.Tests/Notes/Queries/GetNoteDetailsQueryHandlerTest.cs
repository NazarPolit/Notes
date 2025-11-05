using AutoMapper;
using Notes.Application.Notes.Queries.GetNoteDetails;
using Notes.Persistance;
using Notes.Tests.Common;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Notes.Tests.Notes.Queries
{
	[Collection("QueryCollection")]
	public class GetNoteDetailsQueryHandlerTest
	{
		private readonly NotesDbContext Context;
		private readonly IMapper Mapper;

		public GetNoteDetailsQueryHandlerTest(QueryTestFixture fixture)
		{
			Context = fixture.Context;
			Mapper = fixture.Mapper;
		}

		[Fact]
		public async Task GetNoteDetailsQueryHandler_Success()
		{
			var handler = new GetNotesDetailsQueryHandler(Context, Mapper);

			var result = await handler.Handle(
				new GetNoteDetailsQuery
				{
					UserId = NotesContextFactory.UserBId,
					Id = Guid.Parse("272238AE-6D8B-491A-913C-476083AA062A")
				}, 
				CancellationToken.None);

			result.ShouldBeOfType<NoteDetailsVm>();
			result.Title.ShouldBe("Title2");
			result.CreationDate.ShouldBe(DateTime.Today);
		}
	}
}
