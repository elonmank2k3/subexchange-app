package demo.mapper;

import demo.dto.InvitationRecordDTO;
import demo.model.InvitationRecord;

public class InvitationRecordMapper {
    public static InvitationRecordDTO toDTO(InvitationRecord invitationRecord) {
        InvitationRecordDTO dto = new InvitationRecordDTO();
        dto.setId(invitationRecord.getId());
        dto.setTime(invitationRecord.getTime());
        dto.setInviteeEmail(invitationRecord.getInviteeEmail());
        return dto;
    }
}
