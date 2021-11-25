import { Component, OnInit, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { Shader } from '../models/shader';
import { ShaderProgram } from '../models/shaderprogram';
import {ListboxModule} from 'primeng/listbox';
import { ShaderService } from '../shader.service';
import { TextureService } from '../texture.service';
import {programtexture} from '../models/programtexture';
import {texture} from '../models/texture';
import {InputTextModule} from 'primeng/inputtext';
import { DomSanitizer } from '@angular/platform-browser';
import {FileUploadModule} from 'primeng/fileupload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  private canvas: HTMLCanvasElement;

  private width = 400;
  private height = 300;

  private gl;

  vertex_shader: Shader = null;
  fragment_shader: Shader = null;

  inited: boolean = false;

  private vs_shader;
  private fs_shader;

  constructor(private router: Router,
              private alertService: AlertService,
              private shaderService: ShaderService,
              private textureService: TextureService,
              private sanitizer: DomSanitizer) { }

  objects: string[];
  object: string;

  selected_objects = [];
  selected_object = null;

  // shaders
  shaders: Shader[];
  selected_shader: Shader;
  shader_types: string[];

  //shader programs
  shader_programs: ShaderProgram[];
  selected_shader_program: ShaderProgram;

  //textures
  textures: texture[];
  selected_texture: texture;
  texture_types: string[];
  texture_filtering: string[];
  texture_format: string[];

  texture_url;

  // program texture
  program_textures: programtexture[];
  selected_program_texture: programtexture;

  // WebGL objects
  shader_program;

  ngOnInit() {
    this.objects = ['WebGL', 'Shaders', 'Shader Programs', 'Textures'];
    this.object = 'WebGL';

    // textures
    this.texture_types = ['texture2D', 'texture2DArray', 'textureCubeMap'];
    this.texture_filtering = ['Linear', 'Nearest'];
    this.texture_format = ['RGBA', 'RGB', 'RG', 'R'];

    this.shader_types = ['Vertex', 'Fragment'];

    this.loadTextures();
    this.loadShaderPrograms();
    this.loadShaders();
  }

  activate() {
    if (this.selected_shader_program != null) {
      let id = this.selected_shader_program.id;

      this.vertex_shader = this.shaders.find(shader => {
          if (shader.ShaderProgramID == id && shader.type == 'Vertex') {
            return true;
          }
          else {
            return false;
          }
      });

      this.fragment_shader = this.shaders.find(shader => {
          if (shader.ShaderProgramID == id && shader.type == 'Fragment')
            return true;
          else 
            return false;
      });

      if (this.fragment_shader == null) {
          this.alertService.error('Selected shader program does not have connected fragment shader!');
      }

      if (this.vertex_shader == null) {
          this.alertService.error('Selected shader program does not have connected vertex shader!');
      }

    }
  }

  imageListener(event) {
    var reader = new FileReader();
    
    reader.onloadend = (e) => {
      var image = new Image();
      image.src = reader.result.toString();
      image.onload = (e) => {
        this.selected_texture.width = image.width;
        this.selected_texture.height = image.height;
      };

      this.texture_url = this.sanitizer.bypassSecurityTrustUrl(reader.result.toString());
      this.selected_texture.src = reader.result.toString();
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  save_texture() {
    //this.textureService.putTexture(this.selected_texture).subscribe(_ => {});
  }

  add_texture() {
    //this.textureService.addTexture(this.selected_texture).subscribe(_ => {});
  }

  save_shader() {
    //this.shaderService.putShader(this.selected_shader).subscribe(_ => {});
  }

  add_shader() {
    //this.shaderService.addShader(this.selected_shader).subscribe(_ => {});
  }

  updateTextures() {
    this.textureService.getTextures().subscribe(textures => {
         this.textures = textures;
         this.selected_texture = this.textures[0];
     })
  }

  ngAfterViewInit() {
  }

  loadShaders() {
    this.shaderService.getShaders().subscribe(shaders => {
           console.log(shaders);
          shaders._embedded.shaders.forEach(element => {
            console.log(element);
            element.ShaderProgramID = element.shaderProgramID.id;
           });

          this.shaders = shaders._embedded.shaders;
          this.selected_shader = this.shaders[0];
        });
  }

  loadShaderPrograms() {
    this.shaderService.getShaderPrograms().subscribe(shaders => {
      //spring data rest json format is evil!
          this.shader_programs = shaders._embedded.shaderPrograms;
          this.selected_shader_program = this.shader_programs[0];
          console.log(this.shader_programs);
        });
  }

  loadTextures() {
    this.textureService.getTextures().subscribe(textures => {
      //spring data rest json format is evil!
            this.textures = textures._embedded.textures;
            this.selected_texture = this.textures[0];
        });
  }

  loadProgramTextures() {
    this.shaderService.getShaderPrograms().subscribe(shaders => {
      //spring data rest json format is evil!
          this.shader_programs = shaders._embedded.shaderPrograms;
          this.selected_shader_program = this.shader_programs[0];
        });
  }

  objectChanged() {
    switch (this.object) {
      case 'WebGL':
      break;
      case 'Shaders':
         this.loadShaders();
         this.selected_objects = this.shaders;
         this.inited = false;
      break;
      case 'Shader Programs':
         this.loadShaderPrograms();
         this.selected_objects =  this.shader_programs;
         this.inited = false;
     break;
      case 'Textures':
         this.loadTextures();
         this.selected_objects =  this.textures;
         this.inited = false;
      break;
      case 'Programs-Textures':
        this.inited = false;
        break;
      case 'VAO':
        this.inited = false;
      break;
      case 'VBO':
        this.inited = false;
      break;
    }
  }

  selectedObjectChanged(event) {
    switch (this.object) {
      case 'WebGL':
      break;
      case 'Shaders':
       this.selected_shader = event.value;
      break;
      case 'Shader Programs':
        this.selected_shader_program = event.value;
     break;
      case 'Textures':
        this.selected_texture = event.value;

        if (this.selected_texture.src != null)
            this.texture_url = this.sanitizer.bypassSecurityTrustUrl(this.selected_texture.src);
      break;
      case 'VAO':
      break;
      case 'VBO':
      break;
    }
  }

  saveFragmentShader(s: Shader) {
      this.shaderService.putShader(s);
  }

  initGL() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    document.getElementById('canvas').appendChild(this.canvas);
    this.gl = this.canvas.getContext('webgl');

    if (!this.gl) console.log("WebGL failed to init!");
    else {
      console.log("WebGL initialized!");
      document.getElementById('initbutton').remove();
    }

    this.gl.viewport(0, 0, this.width, this.height); 
    this.gl.clearColor(1.0, 0.0, 0.0, 1.0); 
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.inited = true;
    this.activate();

    this.create_buffer();
  }

  compile_shader(shader: Shader) {
    var shader_type;
    switch(shader.type) {
      case 'Vertex':
        shader_type = this.gl.VERTEX_SHADER;
      break;
      case 'Fragment':
        shader_type = this.gl.FRAGMENT_SHADER;
      break;
      default:
        this.alertService.error('wrong shader type');
    }

    let s = this.gl.createShader(shader_type);
    this.gl.shaderSource(s, shader.code);
    this.gl.compileShader(s);

    let success = this.gl.getShaderParameter(s, this.gl.COMPILE_STATUS);
    if (!success) {
      console.log('shader compilation error: ' + this.gl.getShaderInfoLog(s));
      this.alertService.error('shader compilation error: ' + this.gl.getShaderInfoLog(s));
    } else {
      this.alertService.clear();
    }

    return s;
  }

  create_program(shaders: Shader[]) {
    let program = this.gl.createProgram();
    
    shaders.forEach(shader => {
      this.gl.attachShader(program, shader);
    });

    this.gl.linkProgram(program);

    let success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (!success) {
      console.log("link program error: " + this.gl.getProgramInfoLog(program));
      this.alertService.error("link program error: " + this.gl.getProgramInfoLog(program));
    } else {
      this.alertService.clear();
    }

    return program;
  }

  create_buffer() {
    let b = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, b);
    const positions = [
    -1.0,  1.0,
     1.0,  1.0,
    -1.0, -1.0,
     1.0, -1.0,
    ];
    this.gl.bufferData(this.gl.ARRAY_BUFFER,
                        new Float32Array(positions),
                        this.gl.STATIC_DRAW);
    return b;
  }

convertDataURIToBinary(dataURI: string) {
  var BASE64_MARKER = ';base64,';
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for(var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}
  create_texture(tex: texture) {
    let t = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, t);


    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);

    const level = 0;
    const internalFormat = this.gl.RGBA;
    const width = tex.width;
    const height = tex.height;
    const border = 0;
    const srcFormat = this.gl.RGBA;
    const srcType = this.gl.UNSIGNED_BYTE;

    const pixel = this.convertDataURIToBinary(tex.src);

    this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
    const image = new Image();
    image.onload = () => {
      this.gl.bindTexture(this.gl.TEXTURE_2D, t);
       this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);
    };
    image.src = tex.src;

    return t;
  }

  private buf;
  private compiled_textures : Array<any> = Array<any>();

  render(time) {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.gl.useProgram(this.shader_program);
    {       
      this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.shader_program, 'pos'), 2, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.shader_program, 'pos'));
    }

    this.gl.uniform1f(this.gl.getUniformLocation(this.shader_program, 'time'), time * 0.001);


    let index = 0;
    this.compiled_textures.forEach(t => {
        this.gl.activeTexture(this.gl.TEXTURE0 + index);
        this.gl.bindTexture(this.gl.TEXTURE_2D, t.gl);
        this.gl.uniform1i(this.gl.getUniformLocation(this.shader_program, t.name), index);
        ++index;
    });

    {
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    requestAnimationFrame(t => this.render(t));
  }

  add_shader_program() {
    //this.shaderService().addShaderProgram(this.selected_shader.program);
  }

  save_shader_program() {
    //this.shaderService().putShaderProgram(this.selected_shader.program);
  }

  save() {
    //this.shaderService.putShader(this.fragment_shader);
  }

  compile() {
    this.activate();

    if (this.vertex_shader != null && this.fragment_shader != null) {
        this.compiled_textures = Array<any>();

      this.vs_shader = this.compile_shader(this.vertex_shader);
      console.log(this.vertex_shader);
      this.fs_shader = this.compile_shader(this.fragment_shader);
      this.shader_program = this.create_program([this.vs_shader, this.fs_shader]);

      this.textureService.getSPT(this.selected_shader_program._links.textures.href).subscribe(textures => {
        console.log(textures);
        textures._embedded.textures.forEach(t => {
          this.compiled_textures.push({name: t.name, gl: this.create_texture(t)});
          console.log(this.compiled_textures);
        });

        requestAnimationFrame(t => this.render(t));
      });
    }
  }
}
