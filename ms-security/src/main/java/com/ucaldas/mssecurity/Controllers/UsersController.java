package com.ucaldas.mssecurity.Controllers;

import com.ucaldas.mssecurity.Models.Role;
import com.ucaldas.mssecurity.Models.User;
import com.ucaldas.mssecurity.Repositories.RoleRepository;
import com.ucaldas.mssecurity.Repositories.UserRepository;
import com.ucaldas.mssecurity.services.EmailService;
import com.ucaldas.mssecurity.services.EncryptionService;
import com.ucaldas.mssecurity.services.PasswordService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    private UserRepository theUserRepository;

    @Autowired
    private RoleRepository theRoleRepository;

    @Autowired
    private EncryptionService theEncryptionService;

    @Autowired
    private PasswordService thePasswordService;

    @Autowired
    private EmailService theEmailService;

    @GetMapping("")
    public List<User> findAll() {
        return this.theUserRepository.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public User create(@RequestBody User theNewUser) {
        theNewUser.setPassword(theEncryptionService.convertSHA256(theNewUser.getPassword()));
        return this.theUserRepository.save(theNewUser);
    }
    // public User create(@RequestBody User theNewUser) {

    // // asigna como contraseña el token generado en el servicio de passwordService
    // String tokenPassword = thePasswordService.generateToken();
    // System.out.println("Token generado: " + tokenPassword);
    // theNewUser.setPassword(theEncryptionService.convertSHA256(tokenPassword));
    // return this.theUserRepository.save(theNewUser);
    // }

    @GetMapping("{id}")
    public User findById(@PathVariable String id) {
        User theUser = this.theUserRepository
                .findById(id)
                .orElse(null);
        return theUser;
    }

    @PutMapping("{id}")
    public User update(@PathVariable String id, @RequestBody User theNewUser) {

        User theActualUser = this.theUserRepository
                .findById(id)
                .orElse(null);
        if (theActualUser != null) {
            theActualUser.setName(theNewUser.getName());
            theActualUser.setEmail(theNewUser.getEmail());
            theActualUser.setPassword(theEncryptionService.convertSHA256(theNewUser.getPassword()));
            return this.theUserRepository.save(theActualUser);
        } else {
            return null;
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        User theUser = this.theUserRepository
                .findById(id)
                .orElse(null);
        if (theUser != null) {
            this.theUserRepository.delete(theUser);
        }
    }

    @PutMapping("{userId}/role/{roleId}")
    public User matchRole(@PathVariable String userId, @PathVariable String roleId) {
        User theActualUser = this.theUserRepository
                .findById(userId)
                .orElse(null);
        Role theActualRole = this.theRoleRepository
                .findById(roleId)
                .orElse(null);

        if (theActualUser != null && theActualRole != null) {
            theActualUser.setRole(theActualRole);
            return this.theUserRepository.save(theActualUser);
        } else {
            return null;
        }
    }

    @PutMapping("{userId}/unmatch-role/{roleId}")
    public User unMatchRole(@PathVariable String userId, @PathVariable String roleId) {
        User theActualUser = this.theUserRepository
                .findById(userId)
                .orElse(null);
        Role theActualRole = this.theRoleRepository
                .findById(roleId)
                .orElse(null);

        if (theActualUser != null
                && theActualRole != null
                && theActualUser.getRole().get_id().equals(roleId)) {
            theActualUser.setRole(null);
            return this.theUserRepository.save(theActualUser);
        } else {
            return null;
        }
    }
    /*Recuperar contraseña: por medio de una petición POST donde solo se recibe como cuerpo del JSON 
    el correo del usuario se debe enviar un correo con la contraseña del usuario, dicha contraseña se 
    genera en el servicio de PasswordService y se guarda en la base de datos encriptada con SHA256.
    se deben actualizar los datos del usuario en la base de datos con la nueva contraseña generada.*/

    @PostMapping("/recover-password")
    public void recoverPassword(@RequestBody User theUser) {
        User theActualUser = this.theUserRepository.getUserByEmail(theUser.getEmail());
        if (theActualUser != null) {
            // Generar contraseña
            String tokenPassword = thePasswordService.generateToken();
            System.out.println("Token generado: " + tokenPassword);
            theActualUser.setPassword(theEncryptionService.convertSHA256(tokenPassword));
            this.theUserRepository.save(theActualUser);
            // Enviar contraseña por correo
            this.theEmailService.sendEmail(theActualUser.getEmail(), "Recuperación de contraseña",
            "Su nueva contraseña es: " + tokenPassword);
        }
    }
}
