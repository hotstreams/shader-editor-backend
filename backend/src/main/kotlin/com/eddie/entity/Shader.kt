package com.eddie.entity

import javax.persistence.*

@Entity
data class Shader(
    @Id
    @GeneratedValue
    val id: Int = 0,
    val type: String = "",
    val code: String = "",

    @ManyToOne
    @JoinColumn(name = "shaderprogramid")
    val ShaderProgramID: ShaderProgram? = null
)
