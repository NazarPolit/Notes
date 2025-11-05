using FluentValidation;
using Notes.Application.Notes.Commands.CreateNote;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Notes.Application.Notes.Commands.UpdateNote
{
	public class UpdateNoteCommandValidation : AbstractValidator<UpdateNoteCommand>
	{
        public UpdateNoteCommandValidation()
        {
			RuleFor(updateNoteCommand =>
				updateNoteCommand.Title).NotEmpty().MaximumLength(250);
			RuleFor(updateNoteCommand =>
				updateNoteCommand.UserId).NotEqual(Guid.Empty);
			RuleFor(updateNoteCommand =>
				updateNoteCommand.Id).NotEqual(Guid.Empty);
		}
    }
}
