package demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Setting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "ENUM('Light', 'Dark') DEFAULT 'Light'", insertable = false)
    private String theme;
    @Column(columnDefinition = "VARCHAR(10) DEFAULT 'English'", insertable = false)
    private String language;
    @OneToOne
    User user;
}
