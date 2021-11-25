INSERT INTO ShaderProgram ("description") VALUES ('Simple color shader');
INSERT INTO ShaderProgram ("description") VALUES ('textured shader');
INSERT INTO ShaderProgram ("description") VALUES ('material1');
INSERT INTO ShaderProgram ("description") VALUES ('fire effect');
INSERT INTO ShaderProgram ("description") VALUES ('freezing effect');
INSERT INTO ShaderProgram ("description") VALUES ('raytracing test');
INSERT INTO ShaderProgram ("description") VALUES ('raymarching');

INSERT INTO Shader ("type", "code", ShaderProgramID) VALUES ('Vertex', '', 1);
INSERT INTO Shader ("type", "code", ShaderProgramID) VALUES ('Vertex', '', 2);
INSERT INTO Shader ("type", "code", ShaderProgramID) VALUES ('Vertex', '', 3);
INSERT INTO Shader ("type", "code", ShaderProgramID) VALUES ('Vertex', '', 4);
INSERT INTO Shader ("type", "code", ShaderProgramID) VALUES ('Vertex', '', 5);
INSERT INTO Shader ("type", "code", ShaderProgramID) VALUES ('Vertex', '', 6);

INSERT INTO Shader ("type", "code", ShaderProgramID) VALUES ('Fragment', '', 1);
INSERT INTO Shader ("type", "code", ShaderProgramID) VALUES ('Fragment', '', 2);
INSERT INTO Shader ("type", "code", ShaderProgramID) VALUES ('Fragment', '', 3);
INSERT INTO Shader ("type", "code", ShaderProgramID) VALUES ('Fragment', '', 4);
INSERT INTO Shader ("type", "code", ShaderProgramID) VALUES ('Fragment', '', 5);
INSERT INTO Shader ("type", "code", ShaderProgramID) VALUES ('Fragment', '', 6);

INSERT INTO VertexArray ("name") VALUES ('triangle vertices');
INSERT INTO VertexArray ("name") VALUES ('box vertices');
INSERT INTO VertexArray ("name") VALUES ('dog vertices');
INSERT INTO VertexArray ("name") VALUES ('cat vertices');
INSERT INTO VertexArray ("name") VALUES ('mage vertices');
INSERT INTO VertexArray ("name") VALUES ('human vertices');

INSERT INTO BufferObject ("size", "data", "usage", "frequency") VALUES (48, '010101010101010100101', 'READ', 'STATIC');
INSERT INTO BufferObject ("size", "data", "usage", "frequency") VALUES (160, '010101010101010100101', 'READ', 'STATIC');
INSERT INTO BufferObject ("size", "data", "usage", "frequency") VALUES (512, '010101010101010100101', 'READ', 'STATIC');
INSERT INTO BufferObject ("size", "data", "usage", "frequency") VALUES (512, '010101010101010100101', 'READ', 'STATIC');
INSERT INTO BufferObject ("size", "data", "usage", "frequency") VALUES (2048, '010101010101010100101', 'READ', 'STATIC');
INSERT INTO BufferObject ("size", "data", "usage", "frequency") VALUES (2048, '010101010101010100101', 'READ', 'STATIC');

INSERT INTO VertexAttribute (VertexArrayID, BufferObjectID, "index", "size", "type", "stride", "d_offset")
	VALUES (1, 1, 0, 4, 'GL_FLOAT', 0, 0);
INSERT INTO VertexAttribute (VertexArrayID, BufferObjectID, "index", "size", "type", "stride", "d_offset")
	VALUES (1, 1, 1, 4, 'GL_FLOAT', 0, 4);
INSERT INTO VertexAttribute (VertexArrayID, BufferObjectID, "index", "size", "type", "stride", "d_offset")
	VALUES (2, 2, 0, 4, 'GL_FLOAT', 0, 0);
INSERT INTO VertexAttribute (VertexArrayID, BufferObjectID, "index", "size", "type", "stride", "d_offset")
	VALUES (2, 2, 1, 4, 'GL_FLOAT', 0, 4);
INSERT INTO VertexAttribute (VertexArrayID, BufferObjectID, "index", "size", "type", "stride", "d_offset")
	VALUES (3, 3, 0, 4, 'GL_FLOAT', 0, 0);
INSERT INTO VertexAttribute (VertexArrayID, BufferObjectID, "index", "size", "type", "stride", "d_offset")
	VALUES (3, 3, 1, 4, 'GL_FLOAT', 0, 4);
INSERT INTO VertexAttribute (VertexArrayID, BufferObjectID, "index", "size", "type", "stride", "d_offset")
	VALUES (4, 4, 0, 4, 'GL_FLOAT', 0, 0);
INSERT INTO VertexAttribute (VertexArrayID, BufferObjectID, "index", "size", "type", "stride", "d_offset")
	VALUES (4, 4, 1, 4, 'GL_FLOAT', 0, 4);
INSERT INTO VertexAttribute (VertexArrayID, BufferObjectID, "index", "size", "type", "stride", "d_offset")
	VALUES (5, 5, 0, 4, 'GL_FLOAT', 0, 0);
INSERT INTO VertexAttribute (VertexArrayID, BufferObjectID, "index", "size", "type", "stride", "d_offset")
	VALUES (5, 5, 1, 4, 'GL_FLOAT', 0, 4);
INSERT INTO VertexAttribute (VertexArrayID, BufferObjectID, "index", "size", "type", "stride", "d_offset")
	VALUES (6, 6, 0, 4, 'GL_FLOAT', 0, 0);
INSERT INTO VertexAttribute (VertexArrayID, BufferObjectID, "index", "size", "type", "stride", "d_offset")
	VALUES (6, 6, 1, 4, 'GL_FLOAT', 0, 4);

INSERT INTO Model ("name") VALUES ('triangle');
INSERT INTO Model ("name") VALUES ('box');
INSERT INTO Model ("name") VALUES ('dog');
INSERT INTO Model ("name") VALUES ('cat');
INSERT INTO Model ("name") VALUES ('mage');
INSERT INTO Model ("name") VALUES ('human');

INSERT INTO Material ("name", ShaderProgramID) VALUES ('triangle', 1);
INSERT INTO Material ("name", ShaderProgramID) VALUES ('box', 2);
INSERT INTO Material ("name", ShaderProgramID) VALUES ('dog', 3);
INSERT INTO Material ("name", ShaderProgramID) VALUES ('cat', 4);
INSERT INTO Material ("name", ShaderProgramID) VALUES ('mage', 5);
INSERT INTO Material ("name", ShaderProgramID) VALUES ('human', 6);

INSERT INTO Mesh ("name", ModelID, MaterialID, VertexArrayID) VALUES ('triangle', 1, 1, 1);
INSERT INTO Mesh ("name", ModelID, MaterialID, VertexArrayID) VALUES ('box', 2, 2, 2);
INSERT INTO Mesh ("name", ModelID, MaterialID, VertexArrayID) VALUES ('dog', 3, 3, 3);
INSERT INTO Mesh ("name", ModelID, MaterialID, VertexArrayID) VALUES ('cat', 4, 4, 4);
INSERT INTO Mesh ("name", ModelID, MaterialID, VertexArrayID) VALUES ('mage', 5, 5, 5);
INSERT INTO Mesh ("name", ModelID, MaterialID, VertexArrayID) VALUES ('human', 6, 6, 6);

INSERT INTO Texture ("type", "filtering", "width", "height", "format") VALUES ('Texture2D', 'Linear', 512, 512, 'RGB');
INSERT INTO Texture ("type", "filtering", "width", "height", "format") VALUES ('Texture2D', 'Linear', 512, 512, 'RGB');
INSERT INTO Texture ("type", "filtering", "width", "height", "format") VALUES ('Texture2D', 'Nearest', 1024, 512, 'RGBA');
INSERT INTO Texture ("type", "filtering", "width", "height", "format") VALUES ('Texture2D', 'Nearest', 1024, 512, 'RGBA');
INSERT INTO Texture ("type", "filtering", "width", "height", "format") VALUES ('Texture2D', 'Linear', 1024, 1024, 'RGB');
INSERT INTO Texture ("type", "filtering", "width", "height", "format") VALUES ('Texture2D', 'Linear', 1024, 1024, 'RGB');
