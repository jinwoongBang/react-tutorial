package com.jw.swaggertutorial.account;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/api")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @GetMapping("/accounts")
    public Object getAccountList() {
        return accountRepository.findAll();
    }

    @GetMapping("/account/{id}")
    public Object getAccountById(@PathVariable("id") Long id) {
        return accountRepository.findById(id);
    }

    @DeleteMapping("/account/{id}")
    public Object delAccountById(@PathVariable("id") Long id) {
        accountRepository.deleteById(id);
        return accountRepository.findAll();
    }

    @PostMapping("/account")
    public void saveAccount(@RequestBody Account account) {
        accountRepository.save(account);
    }

}
