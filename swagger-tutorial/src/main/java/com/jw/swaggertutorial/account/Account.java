package com.jw.swaggertutorial.account;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account {

    @Id
    @GeneratedValue
    private Long id;

    private String username;
    private String password;

    @Builder
    public Account(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
