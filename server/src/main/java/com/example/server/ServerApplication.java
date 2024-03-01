package com.example.server;

import com.example.server.models.Workspace;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		/*
		Configuration configuration = new Configuration();
		configuration.addAnnotatedClass(Workspace.class);
		SessionFactory sessionFactory = configuration.buildSessionFactory();
		Session session = sessionFactory.openSession();
		try {
			session.beginTransaction();
			Workspace workspace = session.get(Workspace.class, 1);
			System.out.println(workspace.getName());
			session.getTransaction().commit();
		} finally {
			sessionFactory.close();
		}
		 */
		SpringApplication.run(ServerApplication.class, args);
	}

}
