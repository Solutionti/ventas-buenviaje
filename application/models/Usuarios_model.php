<?php

class Usuarios_model extends CI_model {

    public function __construct(){
		parent::__construct();
		$this->load->model("Generic_model");
	}


    public function getAdministtradores() {
        $this->db->select("*");
        $this->db->from("usuarios");
        $this->db->where("estado", "Activo");
        $result = $this->db->get();
        return $result;
    }

    public function crearUsuarios($data) {
        $pass_encrypt = $this->Generic_model->encriptarPassword($data["password"]);
        $datos = [
            "usuario" => $data["usuario"],
            "password" => $pass_encrypt,
            "email" => $data["email"],
            "nombre" => $data["nombre"],
            "apellido" => $data["apellido"],
            "empresa" => "buen viaje",
            "telefono" => $data["telefono"],
            "hora" => date("h:i A"),
            "fecha" => date("Y-m-d"),
            "rol_usuario" => $data["tp_usuario"],
            "estado" => "Activo",
            "usuario_creacion" => $this->session->userdata("nombre")
        ];
        $this->db->insert("usuarios", $datos);
    }

    public function getUsuariosId($id) {
        $this->db->select("*");
        $this->db->from("usuarios");
        $this->db->where("codigo_usuario", $id);
        $result = $this->db->get();

        return $result;

    }

    public function getUsuariosIdm($id) {
        $this->db->select("*");
        $this->db->from("usuarios");
        $this->db->where("codigo_usuario", $id);
        $result = $this->db->get();

        return $result->row();

    }

    public function actualizarUsuario($data, $id) {
        $datos = [
            "rol_usuario " => $data["tp_usuario"],
            "telefono" => $data["telefono"],
            "email" => $data["correo"],
            "usuario" => $data["usuario"]
        ];
        $this->db->where("codigo_usuario", $id);
        $this->db->update("usuarios", $datos);
    }

    public function eliminarUsuario($id) {
         $data = [
             "estado" => "Inactivo"
         ];
         $this->db->where("codigo_usuario", $id);
         $this->db->update("usuarios", $data);
    }

    public function getUsuarioInformacion() {
        $this->db->select("*");
        $this->db->from("usuarios");
        $this->db->where("codigo_usuario", $this->session->userdata("codigo"));
        $result = $this->db->get();

        return $result;
    }

    public function actualizarUsuarioPerfil($data) {
        $datos = [
          "telefono" => $data["telefono"],
          "empresa" => $data["direccion"]
        ];
        $this->db->update("usuarios", $datos);
    }

}