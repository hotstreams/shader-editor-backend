CREATE TABLE ShaderProgram (
	ID serial PRIMARY KEY,
	description text NOT NULL
); 

CREATE TABLE VertexArray (
	ID serial PRIMARY KEY,
	name varchar(20) NOT NULL
);

CREATE TABLE BufferObject (
	ID serial PRIMARY KEY,
	size integer NOT NULL CHECK(size > 0),
	data bytea,
	usage varchar(20) NOT NULL CHECK(usage IN ('READ', 'WRITE', 'COPY')),
	frequency varchar(10) CHECK(frequency IN ('STATIC', 'DYNAMIC', 'STREAM'))
);

CREATE TABLE VertexAttribute (
	ID serial PRIMARY KEY,
	VertexArrayID integer REFERENCES VertexArray,
	BufferObjectID integer REFERENCES BufferObject,
	index integer NOT NULL CHECK(index >= 0),
	size integer NOT NULL CHECK(size > 0),
	type varchar(20) NOT NULL CHECK(type IN ('GL_FLOAT', 'GL_BYTE', 'GL_INT', 'GL_UNSIGNED_INT', 'GL_UNSIGNED_BYTE')),
	stride integer NOT NULL CHECK(stride >= 0),
	d_offset integer NOT NULL CHECK(d_offset >= 0)
);

CREATE TABLE ShaderProgramBufferObject (
	ShaderProgramID integer REFERENCES ShaderProgram,
	BufferObjectID integer REFERENCES BufferObject,
	UNIQUE(ShaderProgramID, BufferObjectID)
);

CREATE TABLE Shader (
	ID serial PRIMARY KEY,
	type varchar(20) NOT NULL CHECK(type IN ('Vertex', 'Fragment', 'TessEval', 'TessControl', 'Geometry')),
	code text NOT NULL,
	ShaderProgramID integer REFERENCES ShaderProgram
);

CREATE TABLE Texture (
	ID serial PRIMARY KEY,
	type varchar(20) NOT NULL CHECK(type IN ('Texture2D', 'TextureCubeMap', 'Texture2DArray')),
	filtering varchar(10) NOT NULL CHECK(filtering IN ('Linear', 'Nearest')),
	width integer NOT NULL CHECK(width > 0),
	height integer NOT NULL CHECK(height > 0),
	format varchar(10) NOT NULL CHECK(format IN ('RGBA', 'RGB', 'RG', 'R'))
);

CREATE TABLE Framebuffer (
	ID serial PRIMARY KEY,
	description text NOT NULL
);

CREATE TABLE FramebufferTexture (
	TextureID integer REFERENCES Texture,
	FramebufferID integer REFERENCES Framebuffer,
	type varchar(20) NOT NULL CHECK(type IN ('Depth', 'Stencil', 'DepthStencil', 'Color0')),
	UNIQUE(TextureID, FramebufferID)
);

CREATE TABLE ShaderTexture (
	ShaderProgramID integer REFERENCES ShaderProgram,
	TextureID integer REFERENCES Texture,
	UNIQUE(ShaderProgramID, TextureID)
);

CREATE TABLE Model (
	ID serial PRIMARY KEY,
	name varchar(20) NOT NULL
);

CREATE TABLE Material (
	ID serial PRIMARY KEY,
	name varchar(20) NOT NULL,
	ShaderProgramID integer REFERENCES ShaderProgram
);

CREATE TABLE Mesh (
	ID serial PRIMARY KEY,
	name varchar(20) NOT NULL,
	ModelID integer REFERENCES Model,
	MaterialID integer REFERENCES Material,
	VertexArrayID integer REFERENCES VertexArray
);