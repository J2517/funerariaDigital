//Repositorio para el modelo Statistics

package com.ucaldas.mssecurity.Repositories;

import com.ucaldas.mssecurity.Models.Statistics;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface StatisticsRepository extends MongoRepository<Statistics, String>{
    @Query("{ 'user._id': ?0 }")
    Statistics getStatisticsByUser(String userId);
}
