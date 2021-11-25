package com.eddie.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToMany

@Entity
data class VertexArray(
    @Id
    @GeneratedValue
    val id: Int = 0,

    val name: String = "",

    @OneToMany(mappedBy = "vertexArray")
    val vertexAttribute: List<VertexAttribute> = listOf()
)
