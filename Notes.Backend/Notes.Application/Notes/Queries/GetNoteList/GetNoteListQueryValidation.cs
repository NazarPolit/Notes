using FluentValidation;
using Notes.Application.Notes.Commands.DeleteNote;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Notes.Application.Notes.Queries.GetNoteList
{
    public class GetNoteListQueryValidation : AbstractValidator<GetNoteListQuery>
    {
        public GetNoteListQueryValidation()
        {
            RuleFor(x => x.UserId).NotEqual(Guid.Empty);
		}
    }
}
