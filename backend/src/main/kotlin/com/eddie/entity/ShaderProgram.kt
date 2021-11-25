package com.eddie.entity

import javax.persistence.*

@Entity
@Table(name = "shaderprogram")
data class ShaderProgram(
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    val id: Int = 0,
    val description: String = "",

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(
        name = "shadertexture",
        joinColumns = [JoinColumn(name = "shaderprogramid", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "textureid", referencedColumnName = "id")]
    )
    val textures: List<Texture> = listOf()
)
