package com.eddie.repository

import com.eddie.entity.VertexArray
import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin
@RepositoryRestResource
interface VertexArrayRepository : CrudRepository<VertexArray, Int> {
}
