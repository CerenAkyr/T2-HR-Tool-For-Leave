package tr.com.t2.ik.mapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import tr.com.t2.ik.model.OffDayRequest;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.ws.dto.PersonnelDto;

@Mapper
public interface AutoPersonnelMapper {
    AutoPersonnelMapper MAPPER = Mappers.getMapper(AutoPersonnelMapper.class);

    PersonnelDto mapToPersonnelDto(Personnel personnel);

    Personnel mapToPersonnel(PersonnelDto personnelDto);

}
