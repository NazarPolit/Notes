using FluentValidation;
using Notes.Application.Notes.Commands.CreateNote;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Notes.Application.Notes.Commands.UpdateNote
{
	public class UpdateNoteCommandValidation : AbstractValidator<CreateNoteCommand>
	{
        public UpdateNoteCommandValidation()
        {
			RuleFor(createNoteCommand =>
				createNoteCommand.Title).NotEmpty().MaximumLength(250);
			RuleFor(createNoteCommand =>
				createNoteCommand.UserId).NotEqual(Guid.Empty);
			RuleFor(createNoteCommand =>
				createNoteCommand.Id).NotEqual(Guid.Empty);
		}
    }
}
