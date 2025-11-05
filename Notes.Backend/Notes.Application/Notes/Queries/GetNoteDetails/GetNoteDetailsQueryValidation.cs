using FluentValidation;
using Notes.Application.Notes.Queries.GetNoteList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Notes.Application.Notes.Queries.GetNoteDetails
{
	public class GetNoteDetailsQueryValidation : AbstractValidator<GetNoteDetailsQuery>
	{
        public GetNoteDetailsQueryValidation()
        {
			RuleFor(x => x.UserId).NotEqual(Guid.Empty);
			RuleFor(x => x.Id).NotEqual(Guid.Empty);
		}
    }
}
