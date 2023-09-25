package filecompression.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import filecompression.models.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
    User findByEmail(String email);
}
