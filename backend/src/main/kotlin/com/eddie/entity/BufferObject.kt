package com.eddie.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToOne

@Entity
data class BufferObject(
    @Id
    @GeneratedValue
    val id: Int = 0,

    val size: Int = 0,
    val data: ByteArray = byteArrayOf(),
    val usage: String = "",
    val frequency: String = "",

    @OneToOne(mappedBy = "bufferObject")
    val vertexAttribute: VertexAttribute? = null
)
