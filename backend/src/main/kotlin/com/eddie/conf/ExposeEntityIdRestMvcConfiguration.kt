package com.eddie.conf

import com.eddie.entity.*
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer
import org.springframework.stereotype.Component

@Component
class ExposeEntityIdRestMvcConfiguration : RepositoryRestConfigurer {
    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration) {
        config.exposeIdsFor(BufferObject::class.java)
        config.exposeIdsFor(Shader::class.java)
        config.exposeIdsFor(ShaderProgram::class.java)
        config.exposeIdsFor(Texture::class.java)
        config.exposeIdsFor(VertexArray::class.java)
        config.exposeIdsFor(VertexAttribute::class.java)
    }
}