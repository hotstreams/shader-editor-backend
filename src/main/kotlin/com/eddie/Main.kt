package com.eddie

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class Backend {
    companion object {
        fun run() {
            SpringApplication.run(Backend::class.java)
        }
    }
}

fun main() {
    Backend.run()
}
