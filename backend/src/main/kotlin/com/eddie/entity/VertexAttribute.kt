package com.eddie.entity

import javax.persistence.*

@Entity
data class VertexAttribute(
    @Id
    @GeneratedValue
    val id: Int = 0,

    @ManyToOne
    @JoinColumn(name = "vertex_array_id")
    val vertexArray: VertexArray? = null,

    @OneToOne
    @JoinColumn(name = "buffer_object_id")
    val bufferObject: BufferObject? = null,

    val index: Int = 0,
    val size: Int = 0,
    val type: String = "",
    val stride: Int = 0,
    val d_offset: Int = 0
)
