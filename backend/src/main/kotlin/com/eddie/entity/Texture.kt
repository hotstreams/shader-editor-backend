package com.eddie.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Texture(
    @Id
    @GeneratedValue
    val id: Int = 0,

    val type: String = "",
    val filtering: String = "",
    val width: Int = 0,
    val height: Int = 0,
    val format: String = "",
    val src: String? = "",
    val name: String? = ""
)
