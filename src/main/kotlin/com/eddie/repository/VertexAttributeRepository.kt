package com.eddie.repository

import com.eddie.entity.VertexAttribute
import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin
@RepositoryRestResource
interface VertexAttributeRepository : CrudRepository<VertexAttribute, Int> {
}
