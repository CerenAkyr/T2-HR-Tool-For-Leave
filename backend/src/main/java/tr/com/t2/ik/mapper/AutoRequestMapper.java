package tr.com.t2.ik.mapper;

import org.mapstruct.factory.Mappers;
import tr.com.t2.ik.model.OffDayRequest;
import tr.com.t2.ik.ws.dto.RequestCalendarDTO;

public interface AutoRequestMapper {
    AutoRequestMapper MAPPER = Mappers.getMapper(AutoRequestMapper.class);

    RequestCalendarDTO mapToRequestCalendarDto(OffDayRequest request);

    OffDayRequest mapToOffDayRequest(RequestCalendarDTO requestCalendarDTO);
}
