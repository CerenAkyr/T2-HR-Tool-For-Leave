package tr.com.t2.ik.mapper;

import javax.annotation.processing.Generated;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.ws.dto.PersonnelDto;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-04T11:11:17+0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.35.0.v20230721-1147, environment: Java 17.0.7 (Eclipse Adoptium)"
)
public class AutoPersonnelMapperImpl implements AutoPersonnelMapper {

    @Override
    public PersonnelDto mapToPersonnelDto(Personnel personnel) {
        if ( personnel == null ) {
            return null;
        }

        PersonnelDto personnelDto = new PersonnelDto();

        personnelDto.setActivity( personnel.getActivity() );
        personnelDto.setBirthday( personnel.getBirthday() );
        personnelDto.setEmail( personnel.getEmail() );
        personnelDto.setFirstname( personnel.getFirstname() );
        personnelDto.setGender( personnel.getGender() );
        personnelDto.setLastname( personnel.getLastname() );
        personnelDto.setUsername( personnel.getUsername() );

        return personnelDto;
    }

    @Override
    public Personnel mapToPersonnel(PersonnelDto personnelDto) {
        if ( personnelDto == null ) {
            return null;
        }

        Personnel personnel = new Personnel();

        personnel.setActivity( personnelDto.getActivity() );
        personnel.setBirthday( personnelDto.getBirthday() );
        personnel.setEmail( personnelDto.getEmail() );
        personnel.setFirstname( personnelDto.getFirstname() );
        personnel.setGender( personnelDto.getGender() );
        personnel.setLastname( personnelDto.getLastname() );
        personnel.setUsername( personnelDto.getUsername() );

        return personnel;
    }
}
