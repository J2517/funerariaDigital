package com.ucaldas.mssecurity.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.ucaldas.mssecurity.Models.Fidelidad;

public interface FidelidadRepository extends MongoRepository<Fidelidad, String> {
}

