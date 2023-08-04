package tr.com.t2.ik.mapper;

import javax.annotation.processing.Generated;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.ws.dto.PersonnelDto;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-04T11:31:10+0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 19.0.1 (Oracle Corporation)"
)
public class AutoPersonnelMapperImpl implements AutoPersonnelMapper {

    @Override
    public PersonnelDto mapToPersonnelDto(Personnel personnel) {
        if ( personnel == null ) {
            return null;
        }

        PersonnelDto personnelDto = new PersonnelDto();

        personnelDto.setUsername( personnel.getUsername() );
        personnelDto.setFirstname( personnel.getFirstname() );
        personnelDto.setLastname( personnel.getLastname() );
        personnelDto.setBirthday( personnel.getBirthday() );
        personnelDto.setActivity( personnel.getActivity() );
        personnelDto.setEmail( personnel.getEmail() );
        personnelDto.setGender( personnel.getGender() );

        return personnelDto;
    }

    @Override
    public Personnel mapToPersonnel(PersonnelDto personnelDto) {
        if ( personnelDto == null ) {
            return null;
        }

        Personnel personnel = new Personnel();

        personnel.setUsername( personnelDto.getUsername() );
        personnel.setFirstname( personnelDto.getFirstname() );
        personnel.setLastname( personnelDto.getLastname() );
        personnel.setBirthday( personnelDto.getBirthday() );
        personnel.setActivity( personnelDto.getActivity() );
        personnel.setEmail( personnelDto.getEmail() );
        personnel.setGender( personnelDto.getGender() );

        return personnel;
    }
}
