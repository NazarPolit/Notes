using AutoMapper;
using Notes.Application.Notes.Queries.GetNoteList;
using Notes.Persistance;
using Notes.Tests.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shouldly;

namespace Notes.Tests.Notes.Queries
{
	[Collection("QueryCollection")]
	public class GetNoteListQueryHandlerTest
	{
		private readonly NotesDbContext Context;
		private readonly IMapper Mapper;

        public GetNoteListQueryHandlerTest(QueryTestFixture fixture)
        {
            Context = fixture.Context;
			Mapper = fixture.Mapper;
        }

        [Fact]
		public async void GetNoteListQueryHandlerSuccess()
		{
			var handler = new GetNoteListQueryHandler(Context, Mapper);

			var result = await handler.Handle(
				new GetNoteListQuery
				{
					UserId = NotesContextFactory.UserBId
				},
				CancellationToken.None);

			result.ShouldBeOfType<NoteListVm>();
			result.Notes.Count.ShouldBe(2);
		}
	}
}
